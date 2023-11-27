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
        self.size = None
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

    def set_size(self, size):
        self.size = size
        return self

    def build(self):
        return Pizza(self) 