# Climate Explorer 🌍
**Climate Explorer** is a web platform that provides insightful, interactive resources to deepen our understanding of climate change. With stunning visualizations, tools, and educational content, this Django-based project showcases the impact of climate change and empowers users to contribute to a sustainable future.
## Features 🎯
- **Interactive Climate Maps**: Explore CO₂ emissions, deforestation rates, renewable energy usage, and climate policy impacts using heatmaps and metrics.
- **Carbon Footprint Calculator**: Track and calculate your CO₂ emissions based on your lifestyle, and get feedback to reduce your impact.
- **Educational Resources**: Access curated articles, infographics, and videos on the causes, effects, and solutions to climate change.
- **Real-Time Climate Data**: Fetch real-time climate information, including temperature and weather risks, for any city.
- **Climate Story Generator**: Generate inspiring stories about your climate-friendly actions and their potential future impact.

 ### Screenshots 🖼️
 ![{68281479-FC05-4AD1-8BA6-BF7C42F8EF3D}](https://github.com/user-attachments/assets/35b65d1f-cccd-49ea-8f6d-54f8be9cb91e)
 ![{6D7E6197-551C-4145-80FE-87F3C3FC461D}](https://github.com/user-attachments/assets/b6a094e3-380b-4db4-b89d-43b26f02ecdb)
 ![{B1F2628E-CF6F-4AFD-97A1-F05A923120AD}](https://github.com/user-attachments/assets/b8202038-91e3-4875-bfc7-b1c5a2eb75f0)
 ![{3DD19415-645A-469D-961A-AD6586EF72E5}](https://github.com/user-attachments/assets/0c9278fe-ab3f-4868-9230-0c78549205cc)
![{189F6FEB-F8E3-49D7-9DE7-359DB6ED509C}](https://github.com/user-attachments/assets/5c75845b-403d-47ad-af1c-0767950c7650)
![{0F71AAE5-EBC7-410F-AF56-23E29405E4D1}](https://github.com/user-attachments/assets/a4d18a0a-16a9-461f-8edf-60c4efd14bd6)
![{F0F6AB53-E211-42FC-A43F-F9C4038C3A11}](https://github.com/user-attachments/assets/fe1358dd-37d0-4dd8-94fa-0e2a764e90b0)
![{1613DBAE-4D71-44C1-9E61-BCB06C81C0D3}](https://github.com/user-attachments/assets/bafd92dd-885c-45ab-8277-d3c6e31a2806)




## Project Structure 📁
```plaintext
Project Root
├── backend/
│   ├── backend/        # Core project settings
│   ├── app/            # Main app code (add more if modularized)
│   │   ├── migrations/          # Database migrations  
│   │   ├── templates/           # HTML template files (about.html, etc.)
│   │   ├── static/              # Static files (CSS, JS, images)
│   │   ├── views.py             # View logic (e.g., rendering pages)
│   │   ├── urls.py              # App-specific URL routing
│   │   ├── models.py            # Database model definitions
│   │   ├── admin.py             # Admin interface configuration
│   ├── manage.py                # Django's management tool
├── requirements.txt             # Project dependencies
├── README.md                    # This file
```

This ensures proper rendering in Markdown viewers without issues like incorrect paragraph formatting. Let me know if you need further clarification or additional edits! 😊

## Installation 🚀
1. Clone the repository:
      git clone https://github.com/your-username/climate-explorer.git
   cd backend
2. Create a Python virtual environment:
      python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
3. Install project dependencies:
      pip install -r requirements.txt
4. Set up MySQL:
    - Make sure you have **MySQL** installed and running.
    - Create a database for the project:
      CREATE DATABASE climate_explorer_db;
    - Update your `DATABASES` setting in `settings.py`:
      DATABASES = {
   'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'climate_explorer_db',
        'USER': 'your_username',  # Replace with your MySQL username
        'PASSWORD': 'your_password',  # Replace with your MySQL password
        'HOST': 'localhost',  # Or your database host
        'PORT': '3306',  # Default MySQL port
    }
}

5. Run database migrations:
      python manage.py makemigrations
      python manage.py migrate
6. Create a superuser (for the admin panel):
     python manage.py createsuperuser
7. Start the development server:
      python manage.py runserver
8. Visit [localhost]() in your browser to explore the site.

### **Tech Stack** 🛠️
1. **Frontend**:
    - HTML5, CSS3 (Custom Styles)
    - JavaScript/ES6
    - [Chart.js]() for dynamic charts.
    - Google Maps API for maps and heatmaps.

2. **Backend**:
    - Python (Django Framework)
    - Django Templating Language (DTL)

3. **Other Tools**:
    - OpenWeatherMap API for real-time weather data.
    - Environment Variables (`dotenv` for secure API access).
    - Custom Python-based logic for climate and carbon calculations.

4. **Database**:
    - Django ORM (e.g., SQLite during development).

### **API Usage**
- **OpenWeatherMap API**: Provides weather and climate details.
- **GoMaps**: Generates heatmaps and visualizations.
- **LLAMA API**: Generates stories.
## License 📜
This project is licensed under the **MIT License**. You may see the full license in the `LICENSE` file provided in this repository.
### **Acknowledgments**
- Inspired by NASA Earth Science initiatives.
- Data powered by [OpenWeatherMap]().
- Thank you to LLAMA
## Contact ✉️
For feedback, suggestions, or issues, feel free to reach out:
- **Email**: juborajahmed0213@gmail.com
- **GitHub**: [monkey-d-siyam]()

### Explore 🌱
Take action and be part of the change—leverage Climate Explorer to learn, engage, and make a difference! 🌍
