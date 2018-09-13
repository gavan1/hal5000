import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hal5000';
  // // constructor(private afs: AngularFirestore) { 
  // //   //afs.firestore.settings({ timestampsInSnapshots: true });
  // //   this.usersCol = afs.collection('user',ref => 
  // //   ref.where('type', '==','admin') 
  // // );  
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  user: Observable<firebase.User>;
 constructor(private afAuth: AngularFireAuth, db: AngularFireDatabase){
  this.user = afAuth.authState;
  //console.log(this.user);

 }

 //this.user.subscribe

 login() {
  this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
    this.afAuth.auth.signInAnonymously().then(() => {
      console.log("LOGGEDIN");
      console.log(firebase.auth().currentUser);
      //firebase.database().ref('/users/' + firebase.auth().currentUser);
      
     this.setPresence();



    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    
      if (errorCode === 'auth/operation-not-allowed') {
        alert('You must enable Anonymous auth in the Firebase Console.');
      } else {
        console.error(error);
      }
    });
}).catch((error) =>
    {
})
}

logout() {
  //this.afAuth.auth.signOut();
}
  ngOnInit() {
    this.login();
 }

 setPresence(){
  var amOnline = firebase.database().ref('.info/connected')
  var userRef = firebase.database().ref('/users/'+firebase.auth().currentUser.uid);
  var myConnectionsRef = firebase.database().ref('users/joe/connections');
 
  amOnline.on('value', function(snapshot) {
    if (snapshot.val()) {
      userRef.onDisconnect().remove();
      userRef.set(true);
    }
  });
 
}
}

