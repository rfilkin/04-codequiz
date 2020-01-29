# 04-codequiz

This project is a multiple-choice quiz with questions about coding concepts.

There is a time limit to complete it, and once the user finishes the quiz, they can submit their remaining time as a score to a High Score board. The High Score board will reset to empty whenever the page is re-loaded.

- The user will be notified by an alert whether the answer they just gave is correct or incorrect. The timer is paused while this alert is active (side effect).

- Answering a question incorrectly will deduct the remaining time by 15 seconds, and running out of time will immediately end the quiz with a score of 0.

- the user may view the High Score board at any time by clicking the "View Highscores" button. However, doing this during a quiz session will cancel that session.

Notes:
- the high score board is supposed to be sorted whenever it is displayed, but it doesn't seem to sort correctly when a score entry is 0.
- there is no limit to the amount of scores that can be entered into the high score board
