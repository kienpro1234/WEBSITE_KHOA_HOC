// // src/routes/auth/facebook.strategy.ts
// import { Injectable } from '@nestjs/common'
// import { PassportStrategy } from '@nestjs/passport'
// import { Profile, Strategy } from 'passport-facebook'
// import { AuthService } from './auth.service' // Import service chung của bạn

// import envConfig from 'src/shared/config'

// @Injectable()
// export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
//   constructor(
//     // Chúng ta sẽ inject AuthService để gọi hàm xử lý chung
//     private readonly authService: AuthService,
//   ) {
//     super({
//       clientID: envConfig.FACEBOOK_CLIENT_ID,
//       clientSecret: envConfig.FACEBOOK_CLIENT_SECRET,
//       callbackURL: envConfig.FACEBOOK_REDIRECT_URI, // VD: http://localhost:3000/auth/facebook/callback
//       scope: ['email', 'public_profile'],
//       profileFields: ['id', 'name', 'photos', 'email'],
//     })
//   }

//   /**
//    * Phương thức này sẽ được Passport tự động gọi sau khi đã xác thực thành công
//    * với Facebook và lấy được thông tin người dùng.
//    * @param accessToken Access token từ Facebook
//    * @param refreshToken Refresh token (nếu có)
//    * @param profile Thông tin người dùng từ Facebook trả về
//    * @param done Callback để báo cho Passport biết đã xử lý xong
//    */
//   async validate(
//     accessToken: string,
//     refreshToken: string,
//     profile: Profile,
//     done: (err: any, user: any, info?: any) => void,
//   ): Promise<any> {
//     try {
//       // 1. Trích xuất thông tin cần thiết từ profile
//       const { name, emails, photos } = profile
//       const userProfile = {
//         email: emails?.[0].value,
//         name: `${name?.givenName} ${name?.familyName}`,
//         // avatar: photos?.[0].value, // Nếu bạn cần lưu avatar
//       }

//       // 2. Gọi service chung để xử lý logic (tìm hoặc tạo user, tạo token)
//       // Lưu ý: Chúng ta không có deviceInfo ở đây. Luồng Passport không dễ dàng
//       // truyền state qua lại như cách thủ công. Bạn có thể lưu state vào session
//       // nếu cần, nhưng để đơn giản, chúng ta sẽ bỏ qua deviceInfo.
//       const tokens = await this.authService.processSocialLogin(
//         { email: userProfile.email ?? '', name: userProfile.name },
//         null, // Pass null cho deviceInfo
//       )

//       // 3. Trả về kết quả (tokens) để AuthGuard có thể gán vào request
//       // Gói tokens vào một object user để dễ truy cập trong controller
//       const user = {
//         accessToken: tokens.accessToken,
//         refreshToken: tokens.refreshToken,
//       }

//       done(null, user)
//     } catch (err) {
//       done(err, false)
//     }
//   }
// }
