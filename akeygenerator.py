import os, hashlib
print(hashlib.sha1(os.urandom(32)).hexdigest())
