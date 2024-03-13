import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { join } from "path";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { MailService } from "./mail.service";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                transport: {
                    host: configService.get('EMAIL_HOST'),
                    port: configService.get('EMAIL_PORT'),
                    secure: true,
                    auth: {
                        user: configService.get('EMAIL_USER'),
                        pass: configService.get('EMAIL_PASS'),
                    },
                },
                defaults: {
                    from: '"No Reply <Brain Blitz>" <service@brain-blitz.com>',
                },
                template: {
                    dir: join(__dirname, 'templates'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            inject: [ConfigService],
        })
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}