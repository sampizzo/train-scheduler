// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAvm4Mi0KVzOzY_t_ZyPmNyr369-WN-e0g",
    authDomain: "train-scheduler-7a99e.firebaseapp.com",
    databaseURL: "https://train-scheduler-7a99e.firebaseio.com",
    projectId: "train-scheduler-7a99e",
    storageBucket: "train-scheduler-7a99e.appspot.com",
    messagingSenderId: "538254650279",
    appId: "1:538254650279:web:5f1a676c53c977df03e482",
    measurementId: "G-QRNKN80ET0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  firebase.database().ref().on("value",function(snapshot){
      
  });

  $("#submitBtn").on("click",function(){
      firebase.database().ref().set({

      });
  })