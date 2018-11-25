package server;

public class ServerFuntion {

	public ServerFuntion(){
		
	}
	
	public static void sayingHello(String name) {
		System.out.println("hello, "+ name);
	}
	
	public static void countWords(String sentence) {
		int spaceCount = 0;
		for (char c : sentence.toCharArray()) {
		    if (c == ' ') {
		         spaceCount++;
		    }
		}
		
		System.out.println("number of words: "+ spaceCount);
	}
	
}
