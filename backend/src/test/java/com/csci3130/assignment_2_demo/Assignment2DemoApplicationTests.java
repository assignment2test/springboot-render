package com.csci3130.assignment_2_demo;
import com.csci3130.assignment_2_demo.model.Resume;
import com.csci3130.assignment_2_demo.repository.ResumeRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class Assignment2DemoApplicationTests {

	@Mock
	private ResumeRepository resumeRepository;

	@Test
	void contextLoads() {
		assertNotNull(resumeRepository);
	}

	@Test
	void createTest() {
		Resume resume = new Resume(
				"John", "Doe", "john.doe@gmail.com", "Software Engineer",
				"CS bachelors", "Java", "N/A",
				"CSCI 1110", "few years", "N/A"
		);

		when(resumeRepository.save(any(Resume.class))).thenReturn(resume);
		Resume result = resumeRepository.save(resume);
		assertNotNull(result.getId());

		assertEquals("John", result.getFirstName());
		assertEquals("Doe", result.getLastName());
		assertEquals("john.doe@gmail.com", result.getEmail());
		assertEquals("Software Engineer", result.getRole());
		assertEquals("CS bachelors", result.getQualifications());
		assertEquals("Java", result.getTechSkills());
		assertEquals("N/A", result.getBusinessImpact());
		assertEquals("CSCI 1110", result.getCoursesTaught());
		assertEquals("few years", result.getYearsOfExperience());
		assertEquals("N/A", result.getWorkExperience());
	}

	@Test
	void updateTest() {
		Resume resume = new Resume(
				"test", "test", "test", "test",
				"test", "test", "test",
				"test", "test", "test"
		); // data appears different due to the time at which the unit tests were created, however, it does not impact functionality.

		when(resumeRepository.save(any(Resume.class))).thenReturn(resume);
		Resume save = resumeRepository.save(resume);
		save.setFirstName("Steve");
		Resume result = resumeRepository.save(save);

		assertEquals("Steve", result.getFirstName());
		assertEquals("test", result.getLastName());
		assertEquals("test", result.getEmail());
		assertEquals("test", result.getRole());
		assertEquals("test", result.getQualifications());
		assertEquals("test", result.getTechSkills());
		assertEquals("test", result.getBusinessImpact());
		assertEquals("test", result.getCoursesTaught());
		assertEquals("test", result.getYearsOfExperience());
		assertEquals("test", result.getWorkExperience());
	}

	@Test
	void deleteTest() {
		Resume resume = new Resume(
				"test", "test", "test", "test",
				"test", "test", "test",
				"test", "test", "test"
		);

		resume.setId(1);
		Resume save = resumeRepository.save(resume);
		int id = resume.getId();

		resumeRepository.deleteById(id);
		Optional<Resume> result = resumeRepository.findById(id); // returns optional, not list

		assertTrue(result.isEmpty());
	}

	@Test
	void NegativeIdTest() {
		Resume result = new Resume();
		result.setId(-1);
		assertNotEquals(-1, result.getId());
	}

	@Test
	void emptyResumeTest() {
		Resume resume = new Resume();
		when(resumeRepository.save(any(Resume.class))).thenReturn(resume);
		Resume result = resumeRepository.save(resume);

		assertNotNull(result.getId());
		assertNull(result.getFirstName());
		assertNull(result.getLastName());
	}

	@Test
	void roleFindTest() {

		Resume resume = new Resume(
				"test", "test", "test", "test",
				"test", "test", "test",
				"test", "test", "test"
		);

		List<Resume> resumeList = new ArrayList<>();
		resumeList.add(resume);
		when(resumeRepository.findByRole("programmer")).thenReturn(resumeList); // similar to other mock actions, the get method also needs to be called before
		List<Resume> result = resumeRepository.findByRole("programmer"); // returns list, not optional
		assertEquals(1, result.size());
	}

	@Test
	void findByIdTest() {

		Resume resume = new Resume(
				"test", "test", "test", "test",
				"test", "test", "test",
				"test", "test", "test"
		);

		resume.setId(2);

		when(resumeRepository.findById(2)).thenReturn(Optional.of(resume));
		Optional<Resume> result = resumeRepository.findById(2);
		assertTrue(result.isPresent());
		assertEquals("test", result.get().getFirstName());
	}

	@Test
	void deleteNothingTest() {
		int fakeid = 4;
		doNothing().when(resumeRepository).deleteById(fakeid);
		resumeRepository.deleteById(fakeid);
		Optional<Resume> result = resumeRepository.findById(fakeid);

		assertTrue(result.isEmpty());
	}
}
