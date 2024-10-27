# RSSchool NodeJS websocket task template
> Static http server and base task packages. 
> By default WebSocket client tries to connect to the 3000 port.

### [Task](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/battleship/assignment.md)

## How to install

1.  Clone this repository
```
git clone https://github.com/Yana-Dyachok/websocket-battleship.git
```
2.  Move to the cloned repository
```
cd websocket-battleship
```
3.  Switch the branch to `develop`
```
git checkout develop
```
4.  Install dependencies
```
npm install
```
### N.B.! Dear reviewers, please, when you start the application for the first time, first use the `npm run start:dev` command so that the index.js file is created, than u cat use `npm run start`
## Usage
**Development**

`npm run start:dev`

* App served @ `http://localhost:8181` with nodemon

**Production**

`npm run start`

* App served @ `http://localhost:8181` without nodemon

---
## Scripts
 Scripts                  |   instructions                         | Commands
--------------------------|:---------------------------------------|:-----------------------------
ESLint                    | check:                                 | npm run lint 
Prettier                  | fix and formats files:                 | npm run format
Nodemon                   | App served @ `http://localhost:8181` with nodemon  |  npm run start:dev
TypeScript Compiler       | App served @ `http://localhost:8181` without nodemon   | npm run start


**Note**: replace `npm` with `yarn` in `package.json` if you use yarn.
