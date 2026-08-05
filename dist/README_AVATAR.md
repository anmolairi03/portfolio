# Ready Player Me Avatar Setup

To use your own Ready Player Me avatar:

1. **Create your avatar** at [readyplayer.me](https://readyplayer.me)

2. **Export with animation**:
   - Download your avatar as GLB format
   - If you have a wave animation, make sure it's included in the export
   - Alternatively, you can use Blender to add animations to your avatar

3. **Add to project**:
   - Place your GLB file in the `public` folder
   - Name it `Animated_RPM_Wave.glb` or update the path in `ThreeAvatar.tsx`

4. **File structure should be**:
   ```
   public/
   ├── Animated_RPM_Wave.glb  <- Your avatar file here
   └── README_AVATAR.md
   ```

## Animation Requirements

Your GLB file should include:
- A wave animation (for the interactive wave feature)
- Proper bone structure for head tracking
- Optimized for web (< 10MB recommended)

## Fallback

If no avatar file is found, the component will display a simple 3D fallback character.

## Customization

You can modify the avatar behavior in `src/components/ThreeAvatar.tsx`:
- Adjust lighting and camera position
- Modify head tracking sensitivity
- Add more animations
- Change the fallback character design