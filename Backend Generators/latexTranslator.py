import latex2mathml.converter

latex_input = r"\begin{matrix*}[r]a & b \\ c & d \end{matrix*}"

mathml_output = latex2mathml.converter.convert(latex_input)

print(mathml_output)
