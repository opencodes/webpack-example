# webpack-example
A webpack example for multipage app.

### Build Instructions

The following are build instructions for the wds-web front end.


### development build

In your local environment, you will run a command that will watch for edits to files and
rebuild the modules on edit. The "bootstrap" module is built as a standalone module as it
is very time consuming.

For your development environment, run the following

Go to working directory

    $ cd wds/wds-web

Install dependencies. (Only needs to happen once or on edits to `package.json`) 
  
    $ npm install .

Run dedupe to reduce duplicate module  (Only needs to happen once or on edits to `package.json`)
    
    $ npm dedupe

Build the remaining modules and watch for changes
    
    $ npm run dev


The last task (`npm run dev`) will continue to run, rebuilding on edit of source files. Note that if you edit
the bootstrap module, you will need to rebuild the module (`npm run bootstrap`) 




### production build

To run a production build of the frontend, perform the following steps.

Delete the contents of from svn and commit the deletes. 

    wds/wds-web/src/main/webapp/assets/*

Go to working directory

    $ cd wds/wds-web

Install dependencies 
  
    $ npm install .

Run dedupe to reduce duplicate module 
    
    $ npm dedupe

Build the remaining modules
    
    $ npm run build
    

This will build the JS and CSS files and place them in `wds/wds-web/src/main/webapp/assets`.

This will generate the `src/main/resources/assets.json` file.

Commit the above files (`src/main/webapp/assets/*` and `src/main/resources/assets.json`) into SVN.

