# Warehouse Shift: A Stacking Game

:zap: This game is now playable <a href='https://zenrajko.github.io/warehouse-shift/' target="_blank">here</a>! It's still rough, but you can see the concept.

### Premise

You run a warehouse where customers store their crates. Customers come in, demanding specific crates, which are typically buried under other crates.
Your job is to move crates between stacks, one at a time, to reach the crates customers want.

Also, there are two types of crates:
* Wood - these cannot be stacked more than three high, and cannot support the weight of a metal crate.
* Metal - these can be stacked to any height, and can support wooden crates.

### Features

* This game is built in React with Typescript.
* All graphics are comprised of Google fonts and glyphs.
* Designed for typical mobile phone form factor. 

### Screenshots

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
* Sound effects

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
