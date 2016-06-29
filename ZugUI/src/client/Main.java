package client;

public class Main {

	public static void main(String[] args) {
		WebsocketClient wsc = new WebsocketClient();
		//wsc.send("newTrain");
		//wsc.send("setSpeed 0 1");
		//wsc.send("changeDirection 0");
		wsc.send("setLight 0");
	}

}
