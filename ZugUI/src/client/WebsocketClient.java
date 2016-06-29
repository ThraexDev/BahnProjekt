package client;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import javax.websocket.ClientEndpoint;
import javax.websocket.ContainerProvider;
import javax.websocket.DeploymentException;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;

@ClientEndpoint
public class WebsocketClient {
	Session session = null;
	public WebsocketClient(){
		try {
			URI uri = new URI("ws://localhost:8080/Zug/websocket");
			ContainerProvider.getWebSocketContainer().connectToServer(this, uri);
		} catch (URISyntaxException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (DeploymentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	@OnOpen
	public void onopen(Session s){
		this.session = s;
	}
	
	@OnMessage
	public void onmessage(String message){
		System.out.println(message);
	}
	
	public void send(String message){
		try {
			this.session.getBasicRemote().sendText(message);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
