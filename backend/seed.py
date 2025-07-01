from app import create_app, db
from app.models.models import Lesson, GameQuestion,User
from werkzeug.security import generate_password_hash


def seed_database():
    existing_admin = User.query.filter_by(email="admin@example.com").first()
    if not existing_admin:
        admin_user = User(
            username="admin",
            email="admin@example.com",
            password_hash=generate_password_hash("admin123"),
            role="admin"
        )
        db.session.add(admin_user)
        db.session.commit()
        print("✅ Admin user created.")

    else:
        print("⚠️ Admin already exists.")

    Lesson.query.delete()
    db.session.commit()

    consonants = [
        ("B", "B"), ("C", "C"), ("D", "D"), ("F", "F"), ("G", "G"),
        ("H", "H"), ("J", "J"), ("K", "K"), ("L", "L"), ("M", "M"),
        ("N", "N"), ("P", "P"), ("R", "R"), ("S", "S"), ("T", "T"),
        ("V", "V"), ("W", "W"), ("Y", "Y"), ("Z", "Z")
    ]

    vowels = [("A", "A"), ("E", "E"), ("I", "I"), ("O", "O"), ("U", "U")]

    for letter, content in consonants:
        lesson = Lesson(title=letter, content=content, category="Alphabets")
        db.session.add(lesson)

    for letter, content in vowels:
        lesson = Lesson(title=letter, content=content, category="Vowels")
        db.session.add(lesson)

    body_parts = [
    ("Hair", "nywele"),
    ("Head", "kichwa"),
    ("Face", "uso"),
    ("Eye", "jicho"),
    ("Eyebrow", "nyusi"),
    ("Eyelash", "kope"),
    ("Ear", "sikio"),
    ("Nose", "pua"),
    ("Mouth", "kinywa"),
    ("Lips", "midomo"),
    ("Teeth", "meno"),
    ("Tongue", "ulimi"),
    ("Neck", "shingo"),
    ("Shoulder", "bega"),
    ("Chest", "kifua"),
    ("Elbow", "kiwiko"),
    ("Arm/Hand", "mkono"),
    ("Fingers", "vidole"),
    ("Stomach", "tumbo"),
    ("Knee", "goti"),
    ("Leg", "mguu"),
    ("Foot", "mguu")
    ]

    colors = [
    ("Black", "nyeusi"),
    ("Blue", "bluu"),
    ("Brown", "kahawia"),
    ("Gold", "dhahabu"),
    ("Green", "kijani"),
    ("Grey", "kijivu"),
    ("Lilac", "zambarau ya waridi"),
    ("Navy Blue", "bluu ya giza"),
    ("Yellow", "manjano"),
    ("Orange", "machungwa"),
    ("Pink", "waridi"),
    ("Purple", "zambarau"),
    ("Red", "nyekundu"),
    ("Silver", "fedha"),
    ("Sky Blue", "bluu ya mwanga"),
    ("White", "nyeupe")
    ]

    fruits = [
    ("Apple", "tofaa"),
    ("Banana", "ndizi"),
    ("Orange", "chungwa"),
    ("Pineapple", "nanasi"),
    ("Mango", "embe"),
    ("Grapes", "zabibu"),
    ("Papaya", "papai"),
    ("Watermelon", "tikiti maji"),
    ("Lemon", "limau"),
    ("Avocado", "parachichi"),
    ("Strawberry", "stroberi"),
    ("Pear", "pea"),
    ("Peach", "pichi"),
    ("Plum", "plamu"),
    ("Kiwi", "kiwi"),
    ("Coconut", "nazi"),
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
        ("Wife", "mke"), 
        ("Husband", "mume"),
        ("Family", "familia"),
        ("Relative", "jamaa")
    ]

    animals = [
        ("Dog", "mbwa"), ("Cat", "paka"), ("Cow", "ng'ombe"), ("Sheep", "kondoo"),
        ("Chicken", "kuku"), ("Goat", "mbuzi"), ("Duck", "bata"), ("Horse", "farasi"),
        ("Donkey", "punda"), ("Elephant", "tembo"), ("Lion", "simba"), ("Leopard", "chui"),
        ("Giraffe", "twiga"), ("Crocodile", "mamba"), ("Monkey", "tumbili"),
        ("Zebra", "punda milia"), ("Fish", "samaki"), ("Buffalo", "nyati"),
        ("Bird", "ndege"), ("Bee", "nyuki")
    ]

    shapes = [
    ("Triangle", "pembetatu"),
    ("Circle", "duara"),
    ("Crescent", "hilali"),
    ("Diamond", "almasi"),
    ("Hexagon", "hexagoni"),
    ("Oval", "mviringo"),
    ("Pentagon", "pentagoni"),
    ("Rectangle", "mstatili"),
    ("Square", "mraba"),
    ("Star", "nyota")
    ]


    words_data = []

    for english, swahili in body_parts:
        words_data.append({"title": english, "content": swahili, "category": "Body", "image_url": f"images/body/{swahili}.jpeg"})

    for english, swahili in colors:
        words_data.append({"title": english, "content": swahili, "category": "Colors", "image_url": f"images/colors/{swahili}.jpeg"})

    for english, swahili in fruits:
        words_data.append({"title": english, "content": swahili, "category": "Fruits", "image_url": f"images/fruits/{swahili}.jpeg"})

    for english, swahili in family:
        words_data.append({"title": english, "content": swahili, "category": "Family", "image_url": f"images/family/{swahili}.jpeg"})

    for english, swahili in animals:
        words_data.append({"title": english, "content": swahili, "category": "Animals", "image_url": f"images/animals/{swahili}.jpeg"})

    for english, swahili in shapes:
        words_data.append({"title": english, "content": swahili, "category": "Shapes", "image_url": f"images/shapes/{swahili}.jpeg"})

    for word in words_data:
        lesson = Lesson(
            title=word["title"],
            content=word["content"],
            category=word["category"],
            image_url=word["image_url"]
        )
        db.session.add(lesson)

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

    for english, swahili in basic_sentences:
        audio_filename = english.lower().replace(' ', '_').replace('?', '').replace(',', '').strip()
        lesson = Lesson(
            title=english,
            category="Sentences",
            content=swahili,
            audio_url=f"audio/basic/{audio_filename}.mp3"
        )
        db.session.add(lesson)

    game_questions = [
        {"question": "Cha___la (Hint: Fruits)", "correct_answer": "k", "options": ["p", "m", "k", "b"]},
        {"question": "Suka___ (Hint: Sugar)", "correct_answer": "ri", "options": ["ra", "re", "ri", "ro"]},
        {"question": "Ng'o___be (Hint: Cow)", "correct_answer": "m", "options": ["m", "n", "b", "l"]},
        {"question": "Ki___wa (Hint: Thing)", "correct_answer": "tu", "options": ["tu", "fu", "bo", "no"]},
        {"question": "Ma___ (Hint: Water)", "correct_answer": "ji", "options": ["ji", "zi", "le", "ya"]},
        {"question": "Sa___ki (Hint: Fish)", "correct_answer": "ma", "options": ["na", "ma", "ra", "ta"]},
        {"question": "Ch___ (Hint: Tea)", "correct_answer": "ai", "options": ["ai", "ua", "ia", "oa"]},
        {"question": "Mdo___ (Hint: Mouth)", "correct_answer": "mo", "options": ["mo", "lo", "ro", "to"]},
    ]

    for q in game_questions:
        game = GameQuestion(
            type="fill_blank",
            question=q["question"],
            correct_answer=q["correct_answer"],
            options=q["options"]
        )
        db.session.add(game)

    db.session.commit()
    print("Database seeded successfully!")

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        seed_database()
