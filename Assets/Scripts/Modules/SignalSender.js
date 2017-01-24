
#pragma strict

class ReceiverItem {
	public var receiver : GameObject;
	public var action : String = "OnSignal";
	public var delay : float;
	
	public function SendWithDelay (sender : MonoBehaviour) {
		yield WaitForSeconds (delay);
		if (receiver)
			receiver.SendMessage (action);
		else
			Debug.LogWarning ("No receiver of signal \""+action+"\" on object "+sender.name+" ("+sender.GetType().Name+")", sender);
	}
}

class SignalSender {
	public var onlyOnce : boolean;
	public var receivers : ReceiverItem[];
	
	private var hasFired : boolean = false;
	
	public function SendSignals (sender : MonoBehaviour) {
		if (hasFired == false || onlyOnce == false) {
			for (var i = 0; i < receivers.length; i++) {
				if(sender.gameObject.active)
					sender.StartCoroutine (receivers[i].SendWithDelay(sender));
				else
					Debug.LogWarning("Could not start "+receivers[i].action+" on "+receivers[i].receiver+" since the GO is inactive.");
			}
			hasFired = true;
		}
	}
}
