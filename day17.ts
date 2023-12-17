type RockPaperScissors = '👊🏻' | '🖐🏾' | '✌🏽'

// All possible winning combinations
type Win = ['👊🏻', '🖐🏾'] | ['🖐🏾', '✌🏽'] | ['✌🏽', '👊🏻']

type WhoWins<
    O extends RockPaperScissors,
    Y extends RockPaperScissors
> = Y extends O ? 'draw' : [O, Y] extends Win ? 'win' : 'lose'
