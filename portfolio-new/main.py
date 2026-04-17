from openai import OpenAI
import sys

# Initialize the client. 
# Best practice: use os.environ.get("NVIDIA_API_KEY") instead of hardcoding.
client = OpenAI(
  base_url="https://integrate.api.nvidia.com/v1",
  api_key="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" # Replace with your newly generated key
)

# Initialize conversation history with an optional system prompt
messages = [
    {"role": "system", "content": "You are a helpful and concise AI assistant."}
]

print("Chatbot initialized! Type 'quit' or 'exit' to stop.")
print("-" * 50)

# Start the chat loop
while True:
    # 1. Get user input
    user_input = input("\nYou: ")
    
    # 2. Check for exit command
    if user_input.lower() in ['quit', 'exit']:
        print("Goodbye!")
        break
    
    # Skip empty inputs
    if not user_input.strip():
        continue
        
    # 3. Add user message to history
    messages.append({"role": "user", "content": user_input})
    
    try:
        # 4. Call the API with the full conversation history
        completion = client.chat.completions.create(
          model="minimaxai/minimax-m2.1",
          messages=messages,
          temperature=1,
          top_p=0.95,good
          max_tokens=8192,
          stream=True
        )
        
        print("Assistant: ", end="")
        
        # 5. Stream the response and build the full string
        full_response = ""
        for chunk in completion:
            if not getattr(chunk, "choices", None):
                continue
            
            content = chunk.choices[0].delta.content
            if content is not None:
                print(content, end="", flush=True)
                full_response += content
                
        print() # Print a newline when the stream finishes
        
        # 6. Add the assistant's response to history so it remembers context
        messages.append({"role": "assistant", "content": full_response})
        
    except Exception as e:
        print(f"\nAn error occurred: {e}")