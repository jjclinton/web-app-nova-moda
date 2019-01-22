"# web-app-nova-moda" 


username: novamoda

password: k0R*l%mK4$95

# Documentation

## Introduction

This documentation is for the web application for the weather stations
with info relevant to Nova Moda's requirements.

## Configuration
In the configuration file the login settings are configured. There is no datbase.
THe password hash is for safety requirements. So the password itself is nowhere
to be fount in the PHP files. The username is not hashed because it doesn't need to
be. Username is open for everyone

At the top of the configuration file the session is started so if the user logs in
the user stays logged in during the entire session, until the user closes the window.
