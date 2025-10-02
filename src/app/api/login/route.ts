import { signToken } from "@/lib/jwt";
import {NextResponse} from "next/server";

const USER = { email: "teste@exemplo.com", password: "123456" };
export async function POST(req: Request) {
console.log("chegoou aqui")
const { email, password } = await req.json();
 if (email !== USER.email || password !== USER.password) {
 return NextResponse.json({ error: "Credenciais inválidas" }, {
status: 401 });
 }

 const token = await signToken({ email });
 console.log('TOKEN', token)
 return NextResponse.json({ token });
}   