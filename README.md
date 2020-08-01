# Udacity Cloud Developer Captstone
This is the capstone project for Udacity's cloud developer nanodegree program

## Authenticating via Auth0
The Postman collection in this repo is configured to get a bearer token by following the steps below.
1. Navigate to the edit collection view.
2. Select the variables tab and enter the Auth0 client secret.
3. Select the authorization tab and click 'Get New Access Token'.
4. Click to request a token within the get new access token view.
5. A web browser should open to continue the login process. Once complete return to Postman.
6. From the authorization tab, select the token you created via the available tokens dropdown control. It's name should be 'Default'.
7. Select Update.
8. You should now be able to make calls to the API.
