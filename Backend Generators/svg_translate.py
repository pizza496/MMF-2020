from svgpathtools import *

paths, attributes = svg2paths("aleph.svg")

num_samples = 5000

com_points = []
points = []

for i in range(num_samples):
    next_point = paths[0].point(i/(num_samples-1))
    com_points.append(next_point)

for point in com_points:
    points.append([point.real - 1920/2, point.imag - 1080/2])

print(points)
