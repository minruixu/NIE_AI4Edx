import csv
import json
import re
from collections import Counter
import os
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

# Download NLTK resources
nltk.download('punkt')
nltk.download('stopwords')

def process_csv_for_wordcloud(csv_file_path):
    # Read the CSV file
    text_content = ""
    with open(csv_file_path, 'r', encoding='utf-8') as file:
        # Read the entire file as text
        text_content = file.read()
    
    # Clean and tokenize the text
    text_content = text_content.lower()
    # Remove special characters and numbers
    text_content = re.sub(r'[^\w\s]', '', text_content)
    text_content = re.sub(r'\d+', '', text_content)
    
    # Tokenize the text
    tokens = word_tokenize(text_content)
    
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    additional_stop_words = {'the', 'and', 'of', 'to', 'in', 'a', 'is', 'that', 'for', 'on', 'with', 'as', 'by', 'dr', 'prof', 'mr', 'ms', 
                             'ai', 'using', 'used', 'use', 'case', 'context', 'implementation', 'outcome', 'reflection', 'response',
                             'scenario', 'learning', 'key', 'three', 'points', 'analysis', 'process'}
    stop_words.update(additional_stop_words)
    filtered_tokens = [word for word in tokens if word not in stop_words and len(word) > 1]
    
    # Count word frequencies
    word_counts = Counter(filtered_tokens)
    
    # Get the top 100 words
    top_words = word_counts.most_common(100)
    
    # Prepare data for JSON
    word_cloud_data = [{"text": word, "value": count} for word, count in top_words]
    
    return word_cloud_data

def save_to_json(data, output_path):
    # Ensure directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=2)

def process_multiple_cases():
    # Define case files and their corresponding case numbers
    case_files = {
        "nie_case3.csv": 3,
        "nie_case4.csv": 4,
        "nie_case5.csv": 5,
        "nie_case6.csv": 6,
        "nie_case7.csv": 7,
        "nie_case8.csv": 8
    }
    
    base_path = ""
    # Check if we're in the project root or need to prepend ntu-clone
    if os.path.exists("src/data/nie_case1.csv"):
        base_path = ""
    else:
        base_path = "ntu-clone/"
    
    for csv_file, case_number in case_files.items():
        input_path = f"{base_path}src/data/{csv_file}"
        
        if not os.path.exists(input_path):
            print(f"Warning: File {input_path} not found, skipping...")
            continue
            
        output_json = f"{base_path}src/data/nie_case{case_number}_wordcloud.json"
        public_output_json = f"{base_path}public/data/nie_case{case_number}_wordcloud.json"
        
        # Generate and save word cloud data
        word_cloud_data = process_csv_for_wordcloud(input_path)
        save_to_json(word_cloud_data, output_json)
        save_to_json(word_cloud_data, public_output_json)
        
        print(f"✅ Word cloud for Case {case_number} saved to {output_json} and {public_output_json}")

if __name__ == "__main__":
    process_multiple_cases()
    print("All word clouds generated successfully!") 