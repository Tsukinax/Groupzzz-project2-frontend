import type {User} from './user'
import type {Level, Benefit, Service} from './level'
import type {Question} from './exam'
import type {ExamAttempt} from './history'

export interface DbData{
    users: User[]
    levels: Level[]
    benefits: Benefit[]
    services: Service[]
    questions: Question[]
    examHistory: ExamAttempt[]
}



