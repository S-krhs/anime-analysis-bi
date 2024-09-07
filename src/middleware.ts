import { NextRequest, NextResponse } from 'next/server'

// 環境変数のREQUIRED_BASIC_AUTHの値が'true'の場合にBASIC認証
export function middleware(req: NextRequest) {
  const requiredBasicAuth = process.env.REQUIRED_BASIC_AUTH === 'true'
  if(!requiredBasicAuth){
    return NextResponse.next()
  }

  const basicAuth = req.headers.get('authorization')
  const basicAuthUser = process.env.BASIC_AUTH_USER
  const basicAuthPassword = process.env.BASIC_AUTH_PASSWORD
  if (basicAuth) {
    const auth = basicAuth.split(' ')[1]
    const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':')

    if (user === basicAuthUser && pwd === basicAuthPassword) {
      return NextResponse.next()
    }
  }
  return new Response('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}