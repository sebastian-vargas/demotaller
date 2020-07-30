export interface LessonComment {
    id_lesson_comments?: Number;
    id_lesson?: Number;
    id_user?: Number;
    comment: string;
    created_at: Date;
}