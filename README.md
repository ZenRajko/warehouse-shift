# Warehouse Shift: A Stacking Game

:zap: This game is now playable <a href='https://zenrajko.github.io/warehouse-shift/' target="_blank">here</a>! It's still rough, but you can see the concept.

### Premise

You run a warehouse where customers store their crates. Customers come in, demanding specific crates, which are typically buried under other crates.
Your job is to move crates between stacks, one at a time, to reach the crates customers want.

Also, there are two types of crates:
* Wood - these cannot be stacked more than three high, and cannot support the weight of a metal crate.
* Metal - these can be stacked to any height, and can support wooden crates.

This game is built in React with Typescript. All graphics are comprised of Google fonts and glyphs. It's designed for typical mobile phone form factor. 

### Latest Screenshots

Working on an update to implement themes. Some examples below: glowing Neon, nods to the old green-screen and Hercules monitors of my youth, and a paper theme similar to what I'd envisioned originally for this game.

<p>
  <a href='https://zenrajko.github.io/tic-tac-toe/' target="_blank"><img src="https://github.com/user-attachments/assets/69873fd7-16b3-45f1-9ea4-e0f1e0eb73f4" width="200" height="400" /></a>
  &nbsp;&nbsp;
  <a href='https://zenrajko.github.io/tic-tac-toe/' target="_blank"><img src="https://github.com/user-attachments/assets/2673c9b7-d84b-489c-bca6-df7bb79e5070" width="200" height="400" /></a>
  &nbsp;&nbsp;
  <a href='https://zenrajko.github.io/tic-tac-toe/' target="_blank"><img src="https://github.com/user-attachments/assets/a024138a-409c-41f9-af5a-665746e06feb" width="200" height="400" /></a>
  &nbsp;&nbsp;
  <a href='https://zenrajko.github.io/tic-tac-toe/' target="_blank"><img src="https://github.com/user-attachments/assets/cc960edf-4215-4e9c-b391-b1995de5f051" width="200" height="400" /></a>
  &nbsp;&nbsp;
  <a href='https://zenrajko.github.io/tic-tac-toe/' target="_blank"><img src="https://github.com/user-attachments/assets/7c3a9be8-e339-450c-833e-e7303ce4a589" width="200" height="400" /></a>
  &nbsp;&nbsp;
  <a href='https://zenrajko.github.io/tic-tac-toe/' target="_blank"><img src="https://github.com/user-attachments/assets/ea53faad-b34e-4ac5-b258-c360a56e1f16" width="200" height="400" /></a>
</p>

### Screenshots pre June 7, 2025

The first screenshot below shows a typical level. The <font color="gold">golden</font> crate is the one you have to reach. 
The top crate on each stack is highlighted with the <font color="cyan">cyan</font> border, indicating that these are the crates that can be moved.

The second screenshot shows what happens when you click on one of the top crates. The <font color="red">red</font> squares indicate where it can be moved.
Once the wooden crate on top of the golden crate is moved, you can click the golden crate.
The golden crate will disappear, the number of crates left will reduce by one, and another crate will become the gold crate.

Once all gold crates are clicked, you win!

<p>
  <a href='https://zenrajko.github.io/tic-tac-toe/' target="_blank"><img src="https://github.com/user-attachments/assets/b520958f-9f90-4783-8414-dc31a03a7f25" width="200" height="400" /></a>
  &nbsp;&nbsp;
  <a href='https://zenrajko.github.io/tic-tac-toe/' target="_blank"><img src="https://github.com/user-attachments/assets/3834320a-77bb-40e2-8915-9f45f51fea18" width="200" height="400" /></a>
</p>

### Future ideas

* Difficulty levels to be added. In higher levels, perhaps crates are added to the warehouse as you work, or perhaps there's a time limit.
* Special crates, e.g. fragile ones, where nothing can be stacked on top of them. Or maybe exploding crates!
* Add animations of crates moving from stack to stack.
* Improve the look of the game. It's improved through development (see legacy screenshots below), but I'm still not entirely happy with it.
* Sound effects
* Tidy up the code

### Legacy screenshots

From various stages in development...

<p>
  <img src="https://github.com/user-attachments/assets/7d63cebb-2125-4673-9160-0d4c015687f8" width="200" height="400" />
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/e457052d-b6b1-4449-8705-430e9b8f1bb2" width="200" height="400" />
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/f6382f78-a791-4975-a8ea-2a65f5d75abf" width="200" height="400" />
</p>

<br>

### AI Contributions

This game contains no AI-generated code or art. This is an old-school effort.


### Terms & Conditions

This app is provided as-is. Use at own risk. Free to use as you want, although some credit would be nice.
