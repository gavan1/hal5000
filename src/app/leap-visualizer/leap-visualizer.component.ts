import { Component,Inject, AfterViewInit} from '@angular/core';
import * as THREE from 'node_modules/three';
import * as Leap from 'node_modules/leapjs/lib';
import {handHold,boneHand} from 'node_modules/leapjs-plugins/';

declare let Leap:any;


@Component({
  selector: 'leap-visualizer',
  templateUrl: './leap-visualizer.component.html',
  styleUrls: ['./leap-visualizer.component.scss']
})
export class LeapVisualizerComponent implements AfterViewInit {

  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  cameraTarget: THREE.Vector3;
  scene: THREE.Scene;
   
  
  fieldOfView: number = 5;
  nearClippingPane: number = 1;
  farClippingPane: number = 100;

  constructor() { 
 
    //console.log(Leap);
    this.render = this.render.bind(this);

  }

  ngAfterViewInit() {
    this.setupLeap();
   // this.createScene();
   // this.createCamera();
   // this.startRendering();
  }

setupLeap(){
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.10, 1000);
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  camera.position.z = 500;
  camera.position.y = 400;
  camera.lookAt(new THREE.Vector3(0,200,0));
  scene.position.y = 100;

  let component: LeapVisualizerComponent = this;
  var fingers = {};

var colors = [0xff0000, 0x00ff00, 0x0000ff];
var baseBoneRotation = (new THREE.Quaternion).setFromEuler(
    new THREE.Euler(Math.PI / 2, 0, 0)
);
var fingers = {};
Leap.loop({host:'127.0.0.1',background: true}, {
  hand: function (hand) {

    hand.fingers.forEach(function (finger) {
      var arrows = finger.data('arrows');
      finger.bones.forEach(function(bone, i){
        var arrow;
        for (var j = 0; j < 3; j++){
          arrow = arrows[i * 3 + j];
          arrow.position.fromArray(bone.prevJoint);
          arrow.setDirection((new THREE.Vector3).fromArray(bone.basis[j]));
         // arrow.setDirection((new THREE.Vector3).fromArray(bone.finger.direction[j]));
        // console.log(bone);
        }
      });
    });
  renderer.render(scene, camera);
}})
.use('handHold')
.use('handEntry')
.use('riggedHand',{
  scale: .7,

  parent: component.scene,
  // renderFn: function(){
  //   //console.log(leapHand)
  //   this.renderer.render(component.scene, component.camera)
  //   offset: new THREE.Vector3(0,10,0)
  // },
  materialOptions: {
    wireframe: false,
    color: new THREE.Color(0xfff000)
  }
      

  //offset: new THREE.Vector3(0,100,0)
})
.on('handFound', function(hand){
  var colors = [0x000000, 0x000000, 0xff0000];
  var length = 34;
  hand.fingers.forEach(function (finger) {
    //console.log("booM");
    var arrows = [];

  //   var arrow = new THREE.ArrowHelper(
  //     new THREE.Vector3(0,0,0),
  //     new THREE.Vector3(1,0,0),
  //     length,
  //     colors[0],
  //     0.2 * length,
  //     0.4 * 0.2 * length
  // );
 // scene.add(arrow);
 // arrows.push(arrow);

    finger.bones.forEach(function(bone) {
      for (var i = 0; i < 3; i++){
        var arrow = new THREE.ArrowHelper(
            new THREE.Vector3(0,0,0),
            new THREE.Vector3(1,0,0),
            length,
            colors[i],
            0.2 * length,
            0.1 * 0.2 * length
        );
     scene.add(arrow);
     arrows.push(arrow);
      }
    });
    finger.data('arrows', arrows);
  });
})
.on('handLost', function(hand){
  hand.fingers.forEach(function (finger) {
    var arrows = finger.data('arrows');
    for (var i = 0; i < arrows.length; i++){
      scene.remove(arrows[i]);
    }
    finger.data({arrows: null});
  });
  renderer.render(scene, camera);
})
.connect();



}

private createCamera() {
  let aspectRatio = this.getAspectRatio();
  this.camera = new THREE.PerspectiveCamera(
    this.fieldOfView,
    aspectRatio,
    this.nearClippingPane,
    this.farClippingPane
  );

  this.camera.position.z = 500;
  this.camera.position.y = 200;
  this.camera.lookAt(new THREE.Vector3(0,200,0));
}
private createScene() {
  this.scene = new THREE.Scene();
  //this.scene.add(new THREE.AxesHelper(200));
  //var loader = new THREE.ColladaLoader();
  //loader.load('../assets/model/multimaterial.dae', this.onModelLoadingCompleted);
 
    // let material = new THREE.MeshBasicMaterial({
    //   color: 0xfff000,
    //   wireframe: true
    // })
    //   // create a box and add it to the scene
    //   var box = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), material);
    //   this.box = box;
    //   box.position.z = 5;
    //   this.scene.add(box);
      
}
  private getAspectRatio(): number {
    let height = this.canvas.clientHeight;
    if (height === 0) {
      return 0;
    }
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private get canvas(): any {
    return document.querySelector('#canvas');
  }

  private startRendering() {
    var self = this;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });

    
    //var v_height:number = 600;
    
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // this.renderer.shadowMap.enabled = true;
    // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // this.renderer.setClearColor(0x000000, 0);
    // this.renderer.autoClear = true;

    let component: LeapVisualizerComponent = this;

    (function render() {
      requestAnimationFrame(render);
    //  self.box.rotation.y += 0.01;
    component.render();
    }()); 
}

  public render() {
    this.renderer.render(this.scene, this.camera);
  }


}
