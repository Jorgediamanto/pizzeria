import csv
import requests
import json



class Pizza:
    def __init__(self, builder):
        self.size = builder.size
        self.cheese = builder.cheese
        self.pepperoni = builder.pepperoni
        self.bacon = builder.bacon

    def __str__(self):
        return f'Pizza: {self.size} {self.cheese} {self.pepperoni} {self.bacon}'

class PizzaBuilder:
    def __init__(self, size):
        self.size = size
        self.cheese = None
        self.pepperoni = None
        self.bacon = None

    def set_cheese(self, cheese):
        self.cheese = cheese
        return self
        
    def set_pepperoni(self, pepperoni):
        self.pepperoni = pepperoni
        return self
    
    def set_bacon(self, bacon): 
        self.bacon = bacon
        return self

    def build(self):
        return Pizza(self)


def build_pizza(user_input):
    mensaje_mostrado = False
    with open('pizzzeria.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            pizza_builder = PizzaBuilder(size='medium')
            if row['column1'] == user_input:
                pizza_builder.set_cheese('mozzarella').set_pepperoni(True).set_bacon(True)
                
                if user_input == '2' and not mensaje_mostrado:
                    recomendacion = "La salsa 2 es muy recomendada al hacer una buena combinación."
                    print(f"Recomendación: {recomendacion}")
                    
                    # Enviar la recomendación al servidor Express
                    enviar_recomendacion_al_servidor(recomendacion)
                    
                    mensaje_mostrado = True
                else:
                    print(f'Recomendación: {str(pizza_builder.build())}')
            else:
                pass

def enviar_recomendacion_al_servidor(recomendacion):
    url = 'http://localhost:5501/sendRecommendation'
    headers = {'Content-Type': 'application/json'}
    data = {'message': recomendacion}
    
    response = requests.post(url, headers=headers, data=json.dumps(data))
    
    if response.status_code == 200:
        print("Recomendación enviada correctamente al servidor.")
    else:
        print(f"Error al enviar la recomendación al servidor. Código de estado: {response.status_code}")



if __name__ == "__main__":
    import sys

    if len(sys.argv) != 2:
        print("Por favor, proporciona el número como argumento.")
        sys.exit(1)

    user_input = sys.argv[1]
    build_pizza(user_input)