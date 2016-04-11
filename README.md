# cellular-automation

## Summary
A cellular automation is a set of cells in a grid, where each cell has a state, such as on or off.  At  specified intervals,
a set of rules is applied to the current state in order to calculate the next state.  The rules determine the next state of a
cell by looking at the the cell's state and its neighboring cells' states.

This example of cellular-automation uses the Rule30 algorithm as described here: http://mathworld.wolfram.com/Rule30.html.

With the Rule30 algorithm, a cell's next state is determined by its own state and the states of the cells immediately to its
right and left.  Since there are 3 cell inputs, and each cell can have two states (on and off), there are 8 rules used to
determine the next state of a given cell.  Using 1 for on and 0 for off, the 8 states and corresponding outcomes are as follows: 

111 = 0, 110 = 1, 101 = 0, 100 = 1, 011 = 1, 010 = 1, 001 = 1, 000 = 0

## Tech Stack
This web application was written in Javascript using the Backbone/Marionette framework and Bootstrap.

## Dependencies
* Node and npm, which can be installed from this site: https://nodejs.org/en/

## To start and run the cellular-automation web app
Download and unzip the cellular-automation zip file
```shell
https://github.com/LaeticiaW/cellular-automation/archive/master.zip
```

Go to the project directory 
```shell
cd cellular-automation-master
```

Install the npm packages 
```shell
npm install
```

Start the node server 
```shell
./start_server.sh
```

Open a browser and start the web app
```shell
http://127.0.0.1:8080/
```

Press the Start Automation button to view the cellular automation.



