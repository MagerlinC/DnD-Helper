import 'firebase/database';
import app from 'firebase/app';
import React, { Component } from 'react';


const config = {
    apiKey: "AIzaSyBM3hME7ByKTYlgpDPoXxmWpWuBZM544rs",
    authDomain: "dndhelper-cef6c.firebaseapp.com",
    databaseURL: "https://dndhelper-cef6c.firebaseio.com",
    projectId: "dndhelper-cef6c",
    storageBucket: "dndhelper-cef6c.appspot.com",
    messagingSenderId: "952708824915"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        //this.auth = app.auth();
        //this.db = app.database();
    }
}

export default Firebase;