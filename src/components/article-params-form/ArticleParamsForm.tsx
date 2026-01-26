import { useEffect, useRef, useCallback, useState } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	formState: ArticleStateType;
	handlers: {
		onFontFamilyChange: (option: OptionType) => void;
		onFontSizeChange: (option: OptionType) => void;
		onFontColorChange: (option: OptionType) => void;
		onBackgroundColorChange: (option: OptionType) => void;
		onContentWidthChange: (option: OptionType) => void;
	};
	onApply: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	formState,
	handlers,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	// Состояние открытия сайдбара (внутреннее состояние формы)
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleToggle = () => {
		setIsOpen((prev) => !prev);
	};

	const sidebarRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node) &&
				isOpen
			) {
				handleToggle();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			onApply();
		},
		[onApply]
	);

	const handleResetForm = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			onReset();
		},
		[onReset]
	);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleResetForm}>
					{/* Заголовок */}
					<Text as='h1' size={31} weight={800} uppercase>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>

					{/* Шрифт */}
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handlers.onFontFamilyChange}
					/>

					{/* Размер шрифта */}
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handlers.onFontSizeChange}
					/>

					{/* Цвет текста */}
					<Select
						title='Цвет текста'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handlers.onFontColorChange}
					/>

					<Separator />

					{/* Цвет фона */}
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handlers.onBackgroundColorChange}
					/>

					{/* Ширина контента */}
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handlers.onContentWidthChange}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
