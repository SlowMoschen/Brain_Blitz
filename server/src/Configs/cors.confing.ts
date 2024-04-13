import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

export const corsOptions: CorsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
} 