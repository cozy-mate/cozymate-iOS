import One from '@/assets/images/character/1.svg';
import Ten from '@/assets/images/character/10.svg';
import Eleven from '@/assets/images/character/11.svg';
import Twelve from '@/assets/images/character/12.svg';
import Thirteen from '@/assets/images/character/13.svg';
import Fourteen from '@/assets/images/character/14.svg';
import Fifteen from '@/assets/images/character/15.svg';
import Sixteen from '@/assets/images/character/16.svg';
import Two from '@/assets/images/character/2.svg';
import Three from '@/assets/images/character/3.svg';
import Four from '@/assets/images/character/4.svg';
import Five from '@/assets/images/character/5.svg';
import Six from '@/assets/images/character/6.svg';
import Seven from '@/assets/images/character/7.svg';
import Eight from '@/assets/images/character/8.svg';
import Nine from '@/assets/images/character/9.svg';

export const CharacterItem = [
  { value: 1, icon: (props: any) => <One {...props} /> },
  { value: 2, icon: (props: any) => <Two {...props} /> },
  { value: 3, icon: (props: any) => <Three {...props} /> },
  { value: 4, icon: (props: any) => <Four {...props} /> },
  { value: 5, icon: (props: any) => <Five {...props} /> },
  { value: 6, icon: (props: any) => <Six {...props} /> },
  { value: 7, icon: (props: any) => <Seven {...props} /> },
  { value: 8, icon: (props: any) => <Eight {...props} /> },
  { value: 9, icon: (props: any) => <Nine {...props} /> },
  { value: 10, icon: (props: any) => <Ten {...props} /> },
  { value: 11, icon: (props: any) => <Eleven {...props} /> },
  { value: 12, icon: (props: any) => <Twelve {...props} /> },
  { value: 13, icon: (props: any) => <Thirteen {...props} /> },
  { value: 14, icon: (props: any) => <Fourteen {...props} /> },
  { value: 15, icon: (props: any) => <Fifteen {...props} /> },
  { value: 16, icon: (props: any) => <Sixteen {...props} /> },
];

export const getPersona = (persona: number, width: number, height: number) => {
  const CharacterComponent = CharacterItem.find((item) => item.value === persona)?.icon;
  return CharacterComponent ? <CharacterComponent width={width} height={height} /> : null;
};
