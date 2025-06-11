from app import create_app, db
from app.models.models import Lesson
import os

def seed_database():
    # Clear existing words
    Lesson.query.delete()
    db.session.commit()

    # Define alphabet letters
    consonants = [
        ("B", "B"),
        ("C", "C"),
        ("D", "D"),
        ("F", "F"),
        ("G", "G"),
        ("H", "H"),
        ("J", "J"),
        ("K", "K"),
        ("L", "L"),
        ("M", "M"),
        ("N", "N"),
        ("P", "P"),
        ("R", "R"),
        ("S", "S"),
        ("T", "T"),
        ("V", "V"),
        ("W", "W"),
        ("Y", "Y"),
        ("Z", "Z")
    ]

    vowels = [
        ("A", "A"),
        ("E", "E"),
        ("I", "I"),
        ("O", "O"),
        ("U", "U")
    ]

    # Insert consonants
    for letter, content in consonants:
        lesson = Lesson(
            title=letter,
            content=content,
            category="Alphabets"
        )
        db.session.add(lesson)

    # Insert vowels
    for letter, content in vowels:
        lesson = Lesson(
            title=letter,
            content=content,
            category="Vowels"
        )
        db.session.add(lesson)

    # Define word categories
    body_parts = [
        ("Head", "kichwa"),
        ("Hand", "mkono"),
        ("Foot", "mguu"),
        ("Eye", "jicho"),
        ("Ear", "sikio"),
        ("Nose", "pua"),
        ("Mouth", "kinywa"),
        ("Hair", "nywele"),
        ("Teeth", "meno"),
        ("Tongue", "ulimi"),
        ("Neck", "shingo"),
        ("Shoulder", "bega"),
        ("Chest", "kifua"),
        ("Elbow", "kiwiko"),
        ("Fingers", "vidole"),
        ("Stomach", "tumbo"),
        ("Knee", "goti"),
        ("Leg", "mguu"),
        ("Face", "uso"),
        ("Lips", "midomo")
    ]

    colors = [
        ("Red", "nyekundu"),
        ("Blue", "bluu"),
        ("Green", "kijani"),
        ("Yellow", "manjano"),
        ("Black", "nyeusi"),
        ("White", "nyeupe"),
        ("Brown", "kahawia"),
        ("Purple", "zambarau"),
        ("Pink", "waridi"),
        ("Orange", "machungwa"),
        ("Gray", "kijivu"),
        ("Light Blue", "bluu ya mwanga"),
        ("Dark Blue", "bluu ya giza"),
        ("Dark Green", "kijani cha giza"),
        ("Light Green", "kijani kibichi"),
        ("Cream", "krimu"),
        ("Maroon", "maruni"),
        ("Gold", "dhahabu"),
        ("Silver", "fedha"),
        ("Color", "rangi")
    ]

    food = [
        ("Rice", "mchele"),
        ("Bread", "mkate"),
        ("Meat", "nyama"),
        ("Fish", "samaki"),
        ("Chicken", "kuku"),
        ("Milk", "maziwa"),
        ("Water", "maji"),
        ("Tea", "chai"),
        ("Salt", "chumvi"),
        ("Sugar", "sukari"),
        ("Beans", "maharagwe"),
        ("Corn", "mahindi"),
        ("Ugali", "ugali"),
        ("Chapati", "chapati"),
        ("Banana", "ndizi"),
        ("Mango", "embe"),
        ("Orange", "chungwa"),
        ("Pineapple", "nanasi"),
        ("Potato", "viazi"),
        ("Sweet Potato", "viazi vitamu")
    ]

    family = [
        ("Mother", "mama"),
        ("Father", "baba"),
        ("Sister", "dada"),
        ("Brother", "kaka"),
        ("Grandmother", "bibi"),
        ("Grandfather", "babu"),
        ("Aunt", "shangazi"),
        ("Uncle", "mjomba"),
        ("Cousin", "binamu"),
        ("Baby", "mtoto"),
        ("Child", "mwana"),
        ("Daughter", "binti"),
        ("Parent", "mzazi"),
        ("Sibling", "ndugu"),
        ("Wife", "mke"),
        ("Husband", "mume"),
        ("Step-mother", "mama wa kambo"),
        ("Step-father", "baba wa kambo"),
        ("Family", "familia"),
        ("Relative", "jamaa")
    ]

    animals = [
        ("Dog", "mbwa"),
        ("Cat", "paka"),
        ("Cow", "ng'ombe"),
        ("Sheep", "kondoo"),
        ("Chicken", "kuku"),
        ("Goat", "mbuzi"),
        ("Duck", "bata"),
        ("Horse", "farasi"),
        ("Donkey", "punda"),
        ("Elephant", "tembo"),
        ("Lion", "simba"),
        ("Leopard", "chui"),
        ("Giraffe", "twiga"),
        ("Crocodile", "mamba"),
        ("Monkey", "tumbili"),
        ("Zebra", "punda milia"),
        ("Fish", "samaki"),
        ("Buffalo", "nyati"),
        ("Bird", "ndege"),
        ("Bee", "nyuki")
    ]

    # Create words data
    words_data = []
    
    # Add body parts
    for english, swahili in body_parts:
        words_data.append({
            "title": english,
            "content": swahili,
            "category": "Body",
            "image_url": f"images/body/{swahili}.jpeg"
        })
    
    # Add colors
    for english, swahili in colors:
        words_data.append({
            "title": english,
            "content": swahili,
            "category": "Colors",
            "image_url": f"images/colors/{swahili}.jpeg"
        })
    
    # Add food
    for english, swahili in food:
        words_data.append({
            "title": english,
            "content": swahili,
            "category": "Food",
            "image_url": f"images/food/{swahili}.jpeg"
        })
    
    # Add family
    for english, swahili in family:
        words_data.append({
            "title": english,
            "content": swahili,
            "category": "Family",
            "image_url": f"images/family/{swahili}.jpeg"
        })

    # Add animals
    for english, swahili in animals:
        words_data.append({
            "title": english,
            "content": swahili,
            "category": "Animals",
            "image_url": f"images/animals/{swahili}.jpeg"
        })

    # Insert words into database
    for word in words_data:
        lesson = Lesson(
            title=word["title"],
            content=word["content"],
            category=word["category"],
            image_url=word["image_url"]
        )
        db.session.add(lesson)

    # Basic sentences
    basic_sentences = [
        ("Hello, how are you?", "Hujambo, habari yako?"),
        ("I am fine, thank you", "Nzuri, asante"),
        ("What is your name?", "Jina lako nani?"),
        ("My name is John", "Jina langu ni John"),
        ("Nice to meet you", "Nafurahi kukutana nawe"),
        ("Where are you from?", "Unatoka wapi?"),
        ("I am from America", "Ninatoka Amerika"),
        ("Do you speak Swahili?", "Unaongea Kiswahili?"),
        ("I am learning Swahili", "Ninajifunza Kiswahili"),
        ("Good morning", "Habari za asubuhi"),
        ("Good afternoon", "Habari za mchana"),
        ("Good evening", "Habari za jioni"),
        ("Good night", "Usiku mwema"),
        ("See you tomorrow", "Tutaonana kesho"),
        ("Have a nice day", "Siku njema"),
        ("Thank you very much", "Asante sana"),
        ("You're welcome", "Karibu"),
        ("Excuse me", "Samahani"),
        ("I'm sorry", "Pole"),
        ("Goodbye", "Kwaheri")
    ]

    # Insert sentences into database
    for english, swahili in basic_sentences:
        lesson = Lesson(
            title=english,
            category="Basic",
            content=swahili,
            audio_url=f"audio/basic/{english.lower().replace(' ', '_')}.mp3"
        )
        db.session.add(lesson)

    db.session.commit()
    print("Database seeded successfully!")

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        seed_database()
