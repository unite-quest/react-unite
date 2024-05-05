import { InsetSpacing } from './inset-spacing';
import { StackSpacing } from './stack-spacing';

export const Header: React.FC<{
  title: string;
  style: string;
  onUserClick?: () => void;
  onBackClick?: () => void;
  variant: 'intro' | 'home' | 'details';
}> = ({ title, style, onUserClick, onBackClick }) => {
  return (
    <header className={`${style}`}>
      <StackSpacing size="sm" />
      <InsetSpacing size="md">
        <div className="flex items-center justify-center relative h-10">
          {onBackClick ? (
            <button
              className="rounded-full border-2 border-black h-10 w-10 flex items-center justify-center bg-white absolute left-0 top-0 "
              onClick={onBackClick}
            >
              <svg className="h-4 w-4 scale-x-[-1]" viewBox="0 0 256 256">
                <path
                  fill="black"
                  d="M129.6,38.5c-7.4,7.4-7.4,19.5,0,26.9l43.6,43.6H29c-10.5,0-19,8.5-19,19s8.5,19,19,19h144.2l-43.6,43.6c-7.4,7.4-7.4,19.5,0,26.9c3.7,3.7,8.6,5.6,13.4,5.6c4.9,0,9.7-1.9,13.4-5.6L246,128l-89.5-89.5C149.1,31.1,137.1,31.1,129.6,38.5z"
                />
              </svg>
            </button>
          ) : null}
          <h1 className="font-roboto font-medium text-xl text-black">{title}</h1>
          {onUserClick ? (
            <button
              className="rounded-full border-2 border-black h-10 w-10 flex items-center justify-center bg-white absolute top-0 right-0"
              onClick={onUserClick}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                <path
                  d="M16.0724 4.02447C15.1063 3.04182 13.7429 2.5 12.152 2.5C10.5611 2.5 9.19773 3.04182 8.23167 4.02447C7.26636 5.00636 6.73644 6.38891 6.73644 8C6.73644 10.169 7.68081 11.567 8.8496 12.4062C9.07675 12.5692 9.3115 12.7107 9.54832 12.8327C8.24215 13.1916 7.18158 13.8173 6.31809 14.5934C4.95272 15.8205 4.10647 17.3993 3.53633 18.813C3.43305 19.0691 3.55693 19.3604 3.81304 19.4637C4.06914 19.567 4.36047 19.4431 4.46375 19.187C5.00642 17.8414 5.78146 16.4202 6.98653 15.3371C8.1795 14.265 9.82009 13.5 12.152 13.5C14.332 13.5 15.9058 14.1685 17.074 15.1279C18.252 16.0953 19.0453 17.3816 19.6137 18.6532C19.9929 19.5016 19.3274 20.5 18.2827 20.5H6.74488C6.46874 20.5 6.24488 20.7239 6.24488 21C6.24488 21.2761 6.46874 21.5 6.74488 21.5H18.2827C19.9348 21.5 21.2479 19.8588 20.5267 18.2452C19.9232 16.8952 19.0504 15.4569 17.7087 14.3551C16.9123 13.7011 15.9603 13.1737 14.8203 12.8507C15.43 12.5136 15.9312 12.0662 16.33 11.5591C17.1929 10.462 17.5676 9.10016 17.5676 8C17.5676 6.38891 17.0377 5.00636 16.0724 4.02447ZM15.3593 4.72553C16.1144 5.49364 16.5676 6.61109 16.5676 8C16.5676 8.89984 16.2541 10.038 15.544 10.9409C14.8475 11.8265 13.7607 12.5 12.152 12.5C11.5014 12.5 10.3789 12.2731 9.43284 11.5938C8.51251 10.933 7.73644 9.83102 7.73644 8C7.73644 6.61109 8.18963 5.49364 8.94477 4.72553C9.69916 3.95818 10.7935 3.5 12.152 3.5C13.5105 3.5 14.6049 3.95818 15.3593 4.72553Z"
                  fill="#000000"
                />
              </svg>
            </button>
          ) : null}
        </div>
      </InsetSpacing>
      <StackSpacing size="sm" />
    </header>
  );
};
