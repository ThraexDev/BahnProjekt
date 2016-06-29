
package server;
import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import userinterface.UI;

@ServerEndpoint("/websocket")
public class WebSocket {

	private static Set<Session> clients = Collections.synchronizedSet(new HashSet<Session>());
	public WebSocket(){
		UI ui = new UI(this);
		ui.start();
	}
	@OnMessage
    public void onMessage(String message, Session session) 
    	throws IOException {
		synchronized(clients){
			// Iterate over the connected sessions
			// and broadcast the received message
			for(Session client : clients){
					System.out.println(message);
					client.getBasicRemote().sendText(message);
			}
		}
		
    }
	
	@OnOpen
    public void onOpen (Session session) {
		System.out.println("Verbunden!");
		// Add session to the connected sessions set
		clients.add(session);
    }

    @OnClose
    public void onClose (Session session) {
    	// Remove session from the connected sessions set
    	clients.remove(session);
    }
}
