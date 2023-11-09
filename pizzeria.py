import csv

# Clase PizzaBuilder para construir pizzas personalizadas
class PizzaBuilder:
    def __init__(self):
        self.pizza = {}

    def set_masa(self, masa):
        self.pizza['masa'] = masa

    def set_salsa(self, salsa):
        self.pizza['salsa'] = salsa

    def add_ingrediente(self, ingrediente):
        if 'ingredientes' not in self.pizza:
            self.pizza['ingredientes'] = []
        self.pizza['ingredientes'].append(ingrediente)

    def set_tecnica_coccion(self, tecnica):
        self.pizza['tecnica_coccion'] = tecnica

    def set_presentacion(self, presentacion):
        self.pizza['presentacion'] = presentacion

    def set_maridaje(self, maridaje):
        self.pizza['maridaje'] = maridaje

    def set_extras(self, extras):
        self.pizza['extras'] = extras

    def build(self):
        return self.pizza

# Clase PizzaDirector para gestionar la construcción de pizzas
class PizzaDirector:
    def __init__(self, builder):
        self.builder = builder

    def construct_pizza(self, masa, salsa, ingredientes, tecnica, presentacion, maridaje, extras):
        self.builder.set_masa(masa)
        self.builder.set_salsa(salsa)
        for ingrediente in ingredientes:
            self.builder.add_ingrediente(ingrediente)
        self.builder.set_tecnica_coccion(tecnica)
        self.builder.set_presentacion(presentacion)
        self.builder.set_maridaje(maridaje)
        self.builder.set_extras(extras)

# Ejemplo de uso
builder = PizzaBuilder()
director = PizzaDirector(builder)

ingredientes = ["tomate", "mozzarella", "pepperoni"]
director.construct_pizza("masa delgada", "salsa clásica", ingredientes, "horno tradicional", "clásica", "vino tinto", "borde de queso")

pizza_personalizada = builder.build()

# Guardar la pizza en un archivo CSV
with open('pizzas_personalizadas.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(pizza_personalizada.keys())
    writer.writerow(pizza_personalizada.values())
