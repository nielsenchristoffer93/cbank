// actor {
//   public query func greet(name : Text) : async Text {
//     return "Hello, " # name # "!";
//   };
// };

import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
  stable var currentValue : Float = 300;
  //currentValue := 300;

  stable var startTime = Time.now();
  //Debug.print(debug_show(startTime));

  let id = 3216546441231515;
  //Debug.print(debug_show(id));

  public func topUp(amount : Float) {
    currentValue += amount;
    Debug.print(debug_show (currentValue));
  };

  public func withdraw(amount : Float) {
    if (currentValue >= amount) {
      currentValue -= amount;
      Debug.print(debug_show (currentValue));
    } else {
      Debug.print("Not enough money");
    };
  };

  public query func checkBalance() : async Float {
    return currentValue;
  };

  public func compound() {
    let currentTime = Time.now();
    let timeElapsedInNanoSeconds = currentTime - startTime;
    let timeElapsedInSeconds = timeElapsedInNanoSeconds / 1_000_000_000;
    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedInSeconds));
    startTime := currentTime;
  };

  public func resetStates() {
    currentValue := 300;
    startTime := Time.now();
  };

};

