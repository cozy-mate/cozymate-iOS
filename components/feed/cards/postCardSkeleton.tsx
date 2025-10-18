import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import { View } from 'react-native';

type Compound = React.FC & {
    Header: React.FC;
    Content: React.FC;
    Footer: React.FC;
};

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <View className="flex flex-col p-4 rounded-2xl bg-[#FFFFFF] gap-y-2">
        {children}
    </View>
);

const Header: React.FC = () => (
    <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row gap-x-[6px] items-center">
            <ContentLoader speed={2} width={120} height={24} backgroundColor="#d1d1d1" foregroundColor="#E6E6E6">
                <Circle cx="12" cy="12" r="12" />
                <Rect x="30" y="4" rx="4" ry="4" width="80" height="16" />
            </ContentLoader>
        </View>
        <ContentLoader speed={2} width={48} height={16} backgroundColor="#d1d1d1" foregroundColor="#E6E6E6">
            <Rect x="0" y="0" rx="4" ry="4" width="48" height="16" />
        </ContentLoader>
    </View>
);

const Content: React.FC = () => (
    <View className="flex flex-col gap-y-[6px]">
        <ContentLoader speed={2} width={260} height={14} backgroundColor="#d1d1d1" foregroundColor="#E6E6E6">
            <Rect x="0" y="0" rx="4" ry="4" width="220" height="14" />
        </ContentLoader>
        <ContentLoader speed={2} width={240} height={14} backgroundColor="#d1d1d1" foregroundColor="#E6E6E6">
            <Rect x="0" y="0" rx="4" ry="4" width="180" height="14" />
        </ContentLoader>
    </View>
);

const Footer: React.FC = () => (
    <View className="flex flex-row gap-x-[6px] items-center">
        <ContentLoader speed={2} width={56} height={18} backgroundColor="#d1d1d1" foregroundColor="#E6E6E6">
            <Circle cx="9" cy="9" r="9" />
            <Rect x="22" y="4" rx="4" ry="4" width="34" height="10" />
        </ContentLoader>
    </View>
);

const PostCardSkeletonBase: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return <Container>{children ?? (<>
        <Header />
        <Content />
        <Footer />
    </>)}</Container>;
};

export const PostCardSkeleton: Compound = PostCardSkeletonBase as Compound;
PostCardSkeleton.Header = Header;
PostCardSkeleton.Content = Content;
PostCardSkeleton.Footer = Footer;

export default PostCardSkeleton;


