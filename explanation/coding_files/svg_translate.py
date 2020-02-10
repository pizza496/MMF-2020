from svgpathtools import *
# imports svgpathtools

paths, attributes = svg2paths("filename.svg")
# import the svg and translate it into paths and the attirbutes
# attributes isn't used again, can be ignored
# paths is an object that can be translated to points.

width = 1920
height = 1080
# define width and height of the viewing area

num_samples = 5000
# define the number of samples to be output

com_points = []
points = [] #will be output
# define the arrays that are used to find the output points

for i in range(num_samples):
    next_point = paths[0].point(i/(num_samples-1))
    com_points.append(next_point)
# while i increases each time, the next point is on the first path and is
# i/(num_samples-1) units along the path
# where 0 is the begining and 1 is the end.
# returns an imaginary number that must be translated to plain numbers

for point in com_points:
    points.append([point.real - width/2, point.imag - height/2])

# translates complex points to points and shifts them based on the
# width and height of the viewing area

print(points)
# output the points
