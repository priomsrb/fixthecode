
def str_to_int(str, default=None):
    """ Converts a String to an int. If not possible then returns default value."""
    if str is not None and str.isdigit():
        return int(str)
    else:
        return default