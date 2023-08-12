For Frontend and backend description, please
see the README.md in the frontend and backend
directories.

# Path: frontend/README.md

# Path: backend/README.md

```js
/**
 *  Frontend Register part 1
 *      - register page
 *      - form & initialState: fullName, password, confirmPassword, email
 *      - onChange and onSubmit/onClick event in form
 *  Backend Register part 1
 *      - created userRouter with express
 *      - test the api ep with fake data
 *      - call that ep with axios and call the function on handleSubmit
 *      - made schema for user
 *  Frontend Register part 2
 *      - onSubmit send the userInfo excluding confirmPassword
 *  Backend Register part 2
 *      - created user modal to save the user in db
 *      - called the modal function in client req route ep to register him and save him in db
 *
 *  Frontend Login 1
 *      - useRef() for email and password
 *        - lets reference value that not's needed for rendering
 *        - current set passed value as initial value
 *        - on submit call the axios helper function calling the route login ep
 *  Backend Login 1
 *      - create login user route ep api/v1/user/login
 *      - receive req.body with emailRef and passwordRef
 *      - find email in the db, check password and make password to undefined after ok
 *      - return success
 *  Frontend Login 2
 *      - receive data and store the data in sessionStorage/rtk
 *      - revised redux/toolkit
 *      - creating store, slice
 *      - useSelector(), useDispatch()
 */
```
