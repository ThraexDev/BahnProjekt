import java.awt.Color;
import java.awt.Graphics;

import javax.swing.JFrame;
import javax.swing.JPanel;

public class KreisPanel extends JPanel {
	
	int x;
	int y;
	int state;
	boolean init;
	int rand;
	int y2;
	
	public KreisPanel(){
		super();
		this.setVisible(true);
		x = 0;
		y = 0;
		init = false;
		state = 0;
		rand = 10;
	}
	@Override
	protected void paintComponent(Graphics g) {
		// TODO Auto-generated method stub
		super.paintComponent(g);
		double a = (this.getWidth() / 2) - rand;
		double b = (this.getHeight() / 2) - rand;
		if(!init){
			init = true;
			x = -(this.getWidth() / 2);
		}
		
		
		double x2 = x * x;
		double anteil = x2/(a*a);
		int akx = x;
		y2 = y;
		y = -(int) Math.sqrt((1-anteil)*(b*b));
		int dif = y2 - y;
		switch (state) {
		case 0:
			if(dif > 0){
				y2=y2-1;
			}
			if(dif < 0){
				y2=y2+1;
			}
			if(dif==0){
				x++;
			}
			if(x > a){
				state = 1;
			}
			break;
		case 1:
			if(dif > 0){
				y2=y2-1;
			}
			if(dif < 0){
				y2=y2+1;
			}
			if(dif==0){
				x--;
			}
			y2=-y2;
			if(x < -a){
				state = 0;
			}
			break;
		default:
			break;
		}
		
		g.setColor(Color.BLACK);
		
		g.fillRect((int)(akx + a),(int) (y2 + b), 5, 5);
		if(state == 1){
			y2 = -y2;
		}
		y = y2;
		try {
			Thread.sleep(10);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		this.repaint();
	}

	public static void main(String[] args) {
        JFrame f = new JFrame("Beispielcode Kreis");
        f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		KreisPanel p = new KreisPanel();
		f.add(p);
		f.setVisible(true);
		f.setSize(800, 400);

	}

}
