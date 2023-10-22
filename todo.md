Tech debt

BUGFIX NEEDED - strikes/spares not working in last frame correctly - got 8: X, 9: X, 10: X,/

Look into using state machine xstate and/or immer to make more of the code functional and stateless

Too much state is being cached - split state into data state, and UI state. Only cache the data
Make all state storing atomic (across all stores at once)

Get end of game working

Visual indication of current pin sum? Maybe the solitaire cards should only selectable when valid

Typescript?

Add animations

Add graphics and/or better styling

Title Screen

Menu

Rules

Component that tells the user which frame/ball they are on

Seed a whole game from one seed
Implement a 'daily' mode, with some sort of tracker recent dailies (line graph?)

Some sort of check 'Are you sure you want to pass, there are still pins you could knock down?'

Can we write a depth-first search for a best possible play? If so and if performant, can we make a perfect AI opponent (codename: Graeme) to compare against. Another idea - could we have a 'time travel' mode where you can go back to earlier plays in order to perfect them?