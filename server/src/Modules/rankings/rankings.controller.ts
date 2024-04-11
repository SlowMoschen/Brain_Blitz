import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { RankingsService } from "./rankings.service";
import { ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "src/Guards/roles.guard";
import { AuthenticationGuard } from "src/Guards/auth.guard";
import { Roles } from "src/Decorators/roles.decorator";
import { Role } from "src/Enums/role.enum";
import { User } from "src/Decorators/user.decorator";

@ApiTags('rankings')
// @UseGuards(AuthenticationGuard, RolesGuard)
// @Roles(Role.ADMIN, Role.USER)
@Controller('rankings')
export class RankingsController {
    constructor(private readonly rankingsService: RankingsService) {}

    @ApiOperation({ summary: 'Get ranking with overall best points' })
    @ApiOkResponse({ description: 'returns an array with users name and sorted by points' })
    @ApiForbiddenResponse({ description: 'If user got no session cookie' })
    @ApiInternalServerErrorResponse({ description: 'if query failed' })
    @Get('overall/points')
    async getBestPoints() {
        return await this.rankingsService.getBestPoints();
    }

    @ApiOperation({ summary: 'Get ranking with overall best playtime' })
    @ApiOkResponse({ description: 'returns an array with users name and sorted by playtime' })
    @ApiForbiddenResponse({ description: 'If user got no session cookie' })
    @ApiInternalServerErrorResponse({ description: 'if query failed' })
    @Get('overall/playtime')
    async getBestPlaytime() {
        return await this.rankingsService.getBestPlaytime();
    }

    @ApiOperation({ summary: 'Get ranking with overall most played quizzes' })
    @ApiOkResponse({ description: 'returns an array with quiz name and sorted by times played' })
    @ApiForbiddenResponse({ description: 'If user got no session cookie' })
    @ApiInternalServerErrorResponse({ description: 'if query failed' })
    @Get('overall/most-played-quizzes')
    async getMostPlayedQuizzes() {
        return await this.rankingsService.getMostPlayedQuizzes();
    }

    @ApiOperation({ summary: 'Get personal ranking' })
    @ApiOkResponse({ description: 'returns an array with information about users rankings in its played quizzes' })
    @ApiForbiddenResponse({ description: 'If user got no session cookie' })
    @ApiInternalServerErrorResponse({ description: 'if query failed' })
    @Get('personal')
    async getPersonalRankings(@User('id') userId: string){
        return await this.rankingsService.getPersonalRankings(userId);
    }

    @ApiOperation({ summary: 'Get overall ranking for a quiz' })
    @ApiOkResponse({ description: 'returns an array with highscores of a quiz sorted by points' })
    @ApiForbiddenResponse({ description: 'If user got no session cookie' })
    @ApiInternalServerErrorResponse({ description: 'if query failed' })
    @Get('overall/:quizId')
    async getOverallRankingsByQuiz(@Param('quizId') quizId: string){
        return await this.rankingsService.getRankingsByQuiz(quizId);
    }
}