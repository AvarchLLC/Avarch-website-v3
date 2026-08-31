import re

html_file = 'aboutfounder.html'
with open(html_file, 'r') as f:
    content = f.read()

data = {
    'https://www.youtube.com/watch?v=f1j2FwKgk7Q': ('panels', 'https://img.youtube.com/vi/f1j2FwKgk7Q/maxresdefault.jpg'),
    'docs.google.com': ('workshops', 'img/icons/ethereum_logo_3d.jpg'),
    'C1LMqQ10gSM': ('conferences', 'https://img.youtube.com/vi/C1LMqQ10gSM/maxresdefault.jpg'),
    'GpeOMZQCiLI': ('panels', 'https://img.youtube.com/vi/GpeOMZQCiLI/maxresdefault.jpg'),
    '0t1aN-qaH9E': ('conferences', 'https://img.youtube.com/vi/0t1aN-qaH9E/maxresdefault.jpg'),
    'gpCc_NAtNn0': ('conferences', 'https://img.youtube.com/vi/gpCc_NAtNn0/maxresdefault.jpg'),
    'xycI1vbxJo8': ('conferences', 'https://img.youtube.com/vi/xycI1vbxJo8/maxresdefault.jpg'),
    'ethereumsingapore': ('conferences', 'img/icons/ethereum_logo_3d.jpg'),
}

def replacer(match):
    url = match.group(1)
    rest = match.group(2)
    
    category = 'community'
    thumb = 'img/icons/ethereum_logo_3d.jpg'
    
    for key in data:
        if key in url:
            category, thumb = data[key]
            break
            
    new_a = f'<a href="{url}" target="_blank" class="f-voice-event-card" data-category="{category}">'
    new_thumb = f'<div class="f-voice-event-thumb"><img src="{thumb}" alt="Thumbnail"></div>'
    
    return new_a + rest + new_thumb

pattern = re.compile(r'<a href="([^"]+)" target="_blank" class="f-voice-event-card">(\s*)<div class="f-voice-event-icon[^>]*>.*?</div>', re.DOTALL)
new_content = pattern.sub(replacer, content)

with open(html_file, 'w') as f:
    f.write(new_content)
print("Done")
