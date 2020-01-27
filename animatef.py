from p5 import *
from math import cos, sin

time = 0
wave = []

def setup():
    size(1200, 400)
    title("Test")
    color_mode('RGB')
    background(0)

def draw():
    global time, wave
    background(0,0,0)
    translate(200,200)
    rad = 100
    stroke(255)
    no_fill()
    circle((0,0), 2*rad)

    x = rad*cos(time)
    y = rad*sin(time)
    wave.insert(0, y)

    fill(255)
    circle((x, y), 8)
    line((0,0), (x,y))

    no_fill()
    begin_shape()
    for i in range(0, len(wave)):
        vertex(i, wave[i])
    end_shape()

    time += 0.05

run()
