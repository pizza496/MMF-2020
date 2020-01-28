import latex2mathml.converter

latex_input = r"\left[\begin{matrix} a & b \\ c & d \end{matrix}\right]"

mathml_output = latex2mathml.converter.convert(latex_input)

print(mathml_output)
