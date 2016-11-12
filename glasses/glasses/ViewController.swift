//
//  ViewController.swift
//  glasses
//
//  Created by Jesse Liang on 11/11/16.
//  Copyright © 2016 Jesse Liang. All rights reserved.
//

import UIKit
import GoogleMaps
import Alamofire

class ViewController: UIViewController, CLLocationManagerDelegate {
    
    
    
    var list = [CLLocationCoordinate2DMake(20, 20), CLLocationCoordinate2DMake(10, 10)]

    var url = "https://f21f5049.ngrok.io"
    
    var locationManager = CLLocationManager()
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        locationManager.delegate = self
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
        // Request permission to use location service
        locationManager.requestWhenInUseAuthorization()
        
        
        let navBar: UINavigationBar = UINavigationBar(frame: CGRect(x: 0, y: 0, width: 420, height: 60))
        self.view.addSubview(navBar);
        let navItem = UINavigationItem(title: "");
        navBar.barTintColor = UIColor(red: 33/255, green: 150/255, blue: 243/255, alpha: 0.9)
        navBar.setItems([navItem], animated: false);

        let label = UILabel(frame: CGRect(x: 0, y: 0, width: 200, height: 21))
        label.center = CGPoint(x: 65, y: 40)
        label.textAlignment = .center
        label.text = "Enstalk 2.0"
        label.font = UIFont(name: "HelveticaNeue", size: CGFloat(22))
        label.textColor = UIColor.white
        self.view.addSubview(label)
        
        Alamofire.request(url).responseJSON { response in
            
            if let JSON = response.result.value {
                //print(JSON)
                
            }
        }
        
        let camera = GMSCameraPosition.camera(withLatitude: -33.86, longitude: 151.20, zoom: 1.0)
        let mapView = GMSMapView.map(withFrame: CGRect.zero, camera: camera)
        mapView.isMyLocationEnabled = true
        view = mapView
        
        var markers = [GMSMarker()]
        
        for i in 0..<list.count {
            
            markers.append(GMSMarker(position: list[i]))
        }
        
        for i in 0..<list.count {
            
            print(markers[i])
            
            markers[i].title = "name"
            markers[i].snippet = "Population: 8,174,100"
            //marker1.icon = UIImage(named: "house")
            markers[i].map = mapView
        }
    }
    
    

    /*override func loadView() {
        
        let camera = GMSCameraPosition.camera(withLatitude: -33.86, longitude: 151.20, zoom: 6.0)
        let mapView = GMSMapView.map(withFrame: CGRect.zero, camera: camera)
        mapView.isMyLocationEnabled = true
        view = mapView
        

        

        
    }*/
}
